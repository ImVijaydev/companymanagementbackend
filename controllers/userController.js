const mysql = require('mysql2');
const db = mysql.createConnection({
  host: 'localhost',
  user: 'vijay',
  password: 'Password@123',
  database: 'CompanyDetails'
});

const getAllUsers = (req, res) => {
  db.query('SELECT * FROM user', (err, results) => {
    if (err) throw err;
    if (results.length === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json(results);
    }
  });
};

const getUserById = (req, res) => {
  const userId = req.params.id;
  db.query('SELECT * FROM user WHERE id = ?', userId, (err, result) => {
    if (err) throw err;
    if (result.length === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json(result);
    }
  });
};

const createUser = (req, res) => {
  const { first_name, last_name, email, designation, date_of_birth, company_id } = req.body;
  const active = true;
  db.query(
    'INSERT INTO user(first_name, last_name, email, designation, date_of_birth, active,company_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [first_name, last_name, email, designation, date_of_birth, active, company_id],
    (err, result) => {
      if (err) throw err;
      res.status(201).json({ message: 'User created successfully' });
    }
  );
};

const updateUser = (req, res) => {
  const userId = req.params.id;
  const { first_name, last_name, email, designation, date_of_birth, active, company_id } = req.body;
  db.query(
    'UPDATE user SET first_name = ?, last_name = ?, email = ?, designation = ?, date_of_birth = ?,active=?,company_id=?  WHERE id = ?',
    [first_name, last_name, email, designation, date_of_birth, active, company_id, userId],
    (err, result) => {
      if (err) throw err;
      if (result.affectedRows === 0) {
        res.status(404).json({ error: 'User not found' });
      } else {
        res.json({ message: 'User updated successfully' });
      }
    }
  );
};

const toggleActiveStatus = (req, res) => {
  const userId = req.params.id;
  const { active } = req.body;
  const message = active ? 'activated' : 'deactivated';
  db.query('UPDATE user SET active = ? WHERE id = ?', [active, userId], (err, result) => {
    if (err) throw err;
    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json({ message: `User ${message} successfully` });
    }
  });
};

const migrateUser = (req, res) => {
  const userId = req.params.id;
  const { company_id } = req.body;
  db.query('UPDATE user SET company_id = ? WHERE id = ?', [company_id, userId], (err, result) => {
    if (err) throw err;
    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json({ message: 'User migrated successfully' });
    }
  });
};

const deleteUser = (req, res) => {
  const userId = req.params.id;
  db.query('DELETE FROM user WHERE id = ?', userId, (err, result) => {
    if (err) throw err;
    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json({ message: 'User deleted successfully' });
    }
  });
};

const getUsersByCompanyId = (req, res) => {
  const companyId = req.params.companyId;
  db.query('SELECT * FROM user WHERE company_id= ?', companyId, (err, result) => {
    if (err) throw err;
    if (result.length === 0) {
      res.status(404).json({ error: 'CompanyId not found' });
    } else {
      res.json(result);
    }
  });
};

const deleteCompanyFromUser = (req, res) => {
  const companyId = req.params.companyId;
  db.query('UPDATE user SET company_id = ? WHERE company_id = ?', [null, companyId], (err, result) => {
    if (err) throw err;
    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json({ message: 'Companyid deleted successfully' });
    }
  });
};

const getUsersBasedOnCompanyId = (req,res) =>{
    const companyId = req.params.id;
    db.query('SELECT * FROM user WHERE company_id= ?', companyId, (err, result) => {
      if (err) throw err;
      if (result.length === 0) {
        res.status(404).json({ error: 'CompanyId not found' });
      } else {
        res.json(result);
      }
    });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  toggleActiveStatus,
  migrateUser,
  deleteUser,
  getUsersByCompanyId,
  deleteCompanyFromUser,
  getUsersBasedOnCompanyId
};