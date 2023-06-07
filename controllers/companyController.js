const mysql = require('mysql2');
const db = mysql.createConnection({
  host: 'localhost',
  user: 'vijay',
  password: 'Password@123',
  database: 'CompanyDetails'
});

const getAllCompanies = (req, res) => {
  db.query('SELECT * FROM companies', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};

const getCompanyById = (req, res) => {
  const companyId = req.params.id;
  db.query('SELECT * FROM companies WHERE id = ?', companyId, (err, result) => {
    if (err) throw err;
    if (result.length === 0) {
      res.status(404).json({ error: 'Company not found' });
    } else {
      res.json(result);
    }
  });
};

const createCompany = (req, res) => {
  const { name, address, latitude, longitude } = req.body;
  db.query(
    'INSERT INTO companies (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
    [name, address, latitude, longitude],
    (err, result) => {
      if (err) throw err;
      res.status(201).json({ message: 'Company created successfully' });
    }
  );
};

const updateCompany = (req, res) => {
  const companyId = req.params.id;
  const { name, address, latitude, longitude } = req.body;
  db.query(
    'UPDATE companies SET name = ?, address = ?, latitude = ?, longitude = ? WHERE id = ?',
    [name, address, latitude, longitude, companyId],
    (err, result) => {
      if (err) throw err;
      if (result.affectedRows === 0) {
        res.status(404).json({ error: 'Company not found' });
      } else {
        res.json({ message: 'Company updated successfully' });
      }
    }
  );
};

const deleteCompany = (req, res) => {
  const companyId = req.params.id;
  db.query('DELETE FROM companies WHERE id = ?', companyId, (err, result) => {
    if (err) throw err;
    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Company not found' });
    } else {
      res.json({ message: 'Company deleted successfully' });
    }
  });
};

module.exports = {
  getAllCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany
};
