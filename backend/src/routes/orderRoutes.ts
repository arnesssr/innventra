import { Router } from 'express';
import { db } from '../config/database';
import { auth } from '../middleware/auth';
import rateLimit from 'express-rate-limit';

const router = Router();

// Configure rate limiter: maximum of 100 requests per 15 minutes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: { error: 'Too many requests, please try again later.' },
});

// Apply rate limiter to all routes in this router
router.use(limiter);
router.get('/', auth, async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM orders ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

router.post('/', auth, async (req, res) => {
  const { customerName, customerEmail, items, total } = req.body;
  try {
    const { rows } = await db.query(
      'INSERT INTO orders (customer_name, customer_email, total, status) VALUES ($1, $2, $3, $4) RETURNING *',
      [customerName, customerEmail, total, 'pending']
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create order' });
  }
});

export default router;
