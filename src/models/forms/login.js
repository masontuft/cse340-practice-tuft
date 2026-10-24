import bcrypt from 'bcrypt';
import db from '../db.js';

/**
 * Find a user by email address for login verification.
 * 
 * @param {string} email - Email address to search for
 * @returns {Promise<Object|null>} User object with password hash or null if not found
 */
const findUserByEmail = async (email) => {
    // SELECT query for id, name, email, password, created_at
    // Use LOWER() on both sides for case-insensitive email comparison
    // Use $1 placeholder for email parameter
    // Add LIMIT 1 to ensure only one result
    // Execute query and return first row or null
    const query = `SELECT id, name, email, password, created_at FROM users WHERE LOWER(email) = LOWER($1) LIMIT 1`;
    const values = [email];

    const result = await db.query(query, values);
    return result.rows[0] || null;
};

/**
 * Verify a plain text password against a stored bcrypt hash.
 * 
 * @param {string} plainPassword - The password to verify
 * @param {string} hashedPassword - The stored password hash
 * @returns {Promise<boolean>} True if password matches, false otherwise
 */
const verifyPassword = async (plainPassword, hashedPassword) => {
    // Use bcrypt.compare() to verify the password
    return await bcrypt.compare(plainPassword, hashedPassword);
};

export { findUserByEmail, verifyPassword };