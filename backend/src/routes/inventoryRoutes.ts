import { Router } from 'express';
import { db } from '../config/database';
import { auth } from '../middleware/auth';
import rateLimit from 'express-rate-limit';

const router = Router();

// Configure rate limiter: maximum of 100 requests per 15 minutes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: { error: 'Too many requests, please try again later.' },
});

// Apply rate limiter to all routes
router.use(limiter);
router.get('/:productId', auth, async (req, res) => {
  try {
    const { rows } = await db.query(
      'SELECT * FROM inventory WHERE product_id = $1',
      [req.params.productId]
    );
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch inventory' });
  }
});

router.put('/:productId/stock', auth, async (req, res) => {
  const { stock } = req.body;
  try {
    const { rows } = await db.query(
      'UPDATE inventory SET stock = $1, updated_at = NOW() WHERE product_id = $2 RETURNING *',
      [stock, req.params.productId]
    );
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update inventory' });
  }
});

router.get('/:id/movements', auth, async (req, res) => {
  try {
    const { rows } = await db.query(
      'SELECT * FROM inventory_movements WHERE product_id = $1 ORDER BY created_at DESC',
      [req.params.id]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch inventory movements' });
  }
});

export default router;
