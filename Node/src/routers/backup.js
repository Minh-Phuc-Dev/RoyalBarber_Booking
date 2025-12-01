const express = require('express');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { Op } = require('sequelize');
const User = require('../models/User/UserModel');
const Appointment = require('../models/Appointment/AppointmentModel');
const Service = require('../models/Service/ServiceModel');
const Promotion = require('../models/Promotion/PromotionModel');

const { authenticate, AuthenticateContext } = require('../middleware/Authenticate');

const router = express.Router();

// Helper function to get authenticated user
const getAuthUser = () => {
    return AuthenticateContext.getStore();
};





router.get("/api/services/:id", async (req, res) => {
    try {
        const service = await Service.findByPk(req.params.id);
        
        if (!service) {
            return res.status(404).json({ message: "Service not found" });
        }

        res.status(200).json({ service });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/api/services/category/:category", async (req, res) => {
    try {
        const services = await Service.findAll({
            where: { 
                category: req.params.category,
                isActive: true 
            },
            order: [['name', 'ASC']]
        });

        res.status(200).json({ services });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get popular services
router.get("/api/services/popular", async (req, res) => {
    try {
        const services = await Service.findAll({
            where: { 
                isActive: true,
                isPopular: true 
            },
            order: [['name', 'ASC']]
        });

        res.status(200).json({ services });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get combo services
router.get("/api/services/combos", async (req, res) => {
    try {
        const services = await Service.findAll({
            where: { 
                isActive: true,
                isCombo: true 
            },
            order: [['name', 'ASC']]
        });

        res.status(200).json({ services });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Admin Service Management Routes
router.post("/api/admin/services", authenticate, async (req, res) => {
    try {
        const authUser = getAuthUser();
        if (authUser.role !== 'ADMIN') {
            return res.status(403).json({ message: "Access denied" });
        }

        const {
            name,
            description,
            category,
            price,
            duration,
            isActive,
            isPopular,
            isCombo,
            requirements,
            includes,
            bookingAdvanceDays,
            cancellationPolicy,
            imageUrl
        } = req.body;

        // Validate required fields
        if (!name || !category || !price || !duration) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const service = await Service.create({
            name,
            description,
            category,
            price,
            duration,
            isActive: isActive !== undefined ? isActive : true,
            isPopular: isPopular || false,
            isCombo: isCombo || false,
            requirements: requirements || [],
            includes: includes || [],
            bookingAdvanceDays: bookingAdvanceDays || 30,
            cancellationPolicy,
            imageUrl
        });

        res.status(201).json({ 
            message: "Service created successfully",
            service 
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put("/api/admin/services/:id", authenticate, async (req, res) => {
    try {
        const authUser = getAuthUser();
        if (authUser.role !== 'ADMIN') {
            return res.status(403).json({ message: "Access denied" });
        }

        const service = await Service.findByPk(req.params.id);
        if (!service) {
            return res.status(404).json({ message: "Service not found" });
        }

        const {
            name,
            description,
            category,
            price,
            duration,
            isActive,
            isPopular,
            isCombo,
            requirements,
            includes,
            bookingAdvanceDays,
            cancellationPolicy,
            imageUrl
        } = req.body;

        const updateData = {};
        if (name !== undefined) updateData.name = name;
        if (description !== undefined) updateData.description = description;
        if (category !== undefined) updateData.category = category;
        if (price !== undefined) updateData.price = price;
        if (duration !== undefined) updateData.duration = duration;
        if (isActive !== undefined) updateData.isActive = isActive;
        if (isPopular !== undefined) updateData.isPopular = isPopular;
        if (isCombo !== undefined) updateData.isCombo = isCombo;
        if (requirements !== undefined) updateData.requirements = requirements;
        if (includes !== undefined) updateData.includes = includes;
        if (bookingAdvanceDays !== undefined) updateData.bookingAdvanceDays = bookingAdvanceDays;
        if (cancellationPolicy !== undefined) updateData.cancellationPolicy = cancellationPolicy;
        if (imageUrl !== undefined) updateData.imageUrl = imageUrl;

        await service.update(updateData);

        res.status(200).json({ 
            message: "Service updated successfully",
            service 
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete("/api/admin/services/:id", authenticate, async (req, res) => {
    try {
        const authUser = getAuthUser();
        if (authUser.role !== 'ADMIN') {
            return res.status(403).json({ message: "Access denied" });
        }

        const service = await Service.findByPk(req.params.id);
        if (!service) {
            return res.status(404).json({ message: "Service not found" });
        }

        await service.destroy();

        res.status(200).json({ message: "Service deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.patch("/api/admin/services/:id/toggle-status", authenticate, async (req, res) => {
    try {
        const authUser = getAuthUser();
        if (authUser.role !== 'ADMIN') {
            return res.status(403).json({ message: "Access denied" });
        }

        const service = await Service.findByPk(req.params.id);
        if (!service) {
            return res.status(404).json({ message: "Service not found" });
        }

        await service.update({ isActive: !service.isActive });

        res.status(200).json({ 
            message: "Service status toggled successfully",
            service 
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.patch("/api/admin/services/:id/toggle-popular", authenticate, async (req, res) => {
    try {
        const authUser = getAuthUser();
        if (authUser.role !== 'ADMIN') {
            return res.status(403).json({ message: "Access denied" });
        }

        const service = await Service.findByPk(req.params.id);
        if (!service) {
            return res.status(404).json({ message: "Service not found" });
        }

        await service.update({ isPopular: !service.isPopular });

        res.status(200).json({ 
            message: "Service popular status toggled successfully",
            service 
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Appointment Routes
router.get("/api/appointments", authenticate, async (req, res) => {
    try {
        const authUser = getAuthUser();
        const appointments = await Appointment.findAll({
            where: { userId: authUser.id },
            include: [
                { model: Service, as: 'service' },
                { model: Promotion, as: 'promotion' },
                { model: User, as: 'staff', attributes: ['id', 'displayName'] }
            ],
            order: [['date', 'DESC'], ['time', 'DESC']]
        });

        res.status(200).json({ appointments });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post(
    "/api/appointments", 
    authenticate,
    [
        body('serviceId').isInt(),
        body('date').isDate(),
        body('time').matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/),
        body('notes').optional().isString()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const authUser = getAuthUser();
            const { serviceId, date, time, notes, promotionId } = req.body;

            // Get service details
            const service = await Service.findByPk(serviceId);
            if (!service || !service.isActive) {
                return res.status(404).json({ message: "Service not found or inactive" });
            }

            // Calculate final price
            let finalPrice = service.price;
            let discountAmount = 0;

            if (promotionId) {
                const promotion = await Promotion.findByPk(promotionId);
                if (promotion && promotion.isActive) {
                    if (promotion.discountType === 'percentage') {
                        discountAmount = (service.price * promotion.discountValue) / 100;
                    } else {
                        discountAmount = promotion.discountValue;
                    }
                    finalPrice = Math.max(0, service.price - discountAmount);
                }
            }

            const appointment = await Appointment.create({
                userId: authUser.id,
                serviceId,
                date,
                time,
                notes: notes || '',
                finalPrice,
                promotionId,
                discountAmount,
                status: 'pending'
            });

            res.status(201).json({ 
                message: "Appointment created successfully",
                appointment 
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
);

router.put("/api/appointments/:id", authenticate, async (req, res) => {
    try {
        const authUser = getAuthUser();
        const appointment = await Appointment.findOne({
            where: { 
                id: req.params.id,
                userId: authUser.id 
            }
        });

        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        await appointment.update(req.body);
        res.status(200).json({ 
            message: "Appointment updated successfully",
            appointment 
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete("/api/appointments/:id", authenticate, async (req, res) => {
    try {
        const authUser = getAuthUser();
        const appointment = await Appointment.findOne({
            where: { 
                id: req.params.id,
                userId: authUser.id 
            }
        });

        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        await appointment.update({ status: 'cancelled' });
        res.status(200).json({ message: "Appointment cancelled successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Promotion Routes
router.get("/api/promotions", async (req, res) => {
    try {
        const promotions = await Promotion.findAll({
            where: { isActive: true },
            order: [['createdAt', 'DESC']]
        });

        res.status(200).json({ promotions });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/api/promotions/active", async (req, res) => {
    try {
        const now = new Date();
        const promotions = await Promotion.findAll({
            where: { 
                isActive: true,
                startDate: { [Op.lte]: now },
                endDate: { [Op.gte]: now }
            },
            order: [['createdAt', 'DESC']]
        });

        res.status(200).json({ promotions });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/api/promotions/:id", async (req, res) => {
    try {
        const promotion = await Promotion.findByPk(req.params.id);
        
        if (!promotion) {
            return res.status(404).json({ message: "Promotion not found" });
        }

        res.status(200).json({ promotion });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/api/promotions/code/:code", async (req, res) => {
    try {
        const promotion = await Promotion.findOne({
            where: { 
                code: req.params.code,
                isActive: true
            }
        });
        
        if (!promotion) {
            return res.status(404).json({ message: "Promotion not found" });
        }

        res.status(200).json({ promotion });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Admin User Management Routes
router.get("/api/admin/users", authenticate, async (req, res) => {
    try {
        const authUser = getAuthUser();
        if (authUser.role !== 'ADMIN') {
            return res.status(403).json({ message: "Access denied" });
        }

        const users = await User.findAll({
            attributes: ['id', 'email', 'displayName', 'role', 'attributes', 'meta', 'createdAt', 'updatedAt'],
            order: [['createdAt', 'DESC']]
        });

        // Transform data to match frontend expectations
        const transformedUsers = users.map(user => {
            const userData = user.toJSON();
            return {
                id: userData.id,
                name: userData.displayName, // Map displayName to name
                email: userData.email,
                role: userData.role === 'ADMIN' ? 'admin' : 'customer', // Map ADMIN/USER to admin/customer
                phone: userData.attributes?.phone || '',
                avatar: userData.attributes?.avatar || '',
                joinDate: userData.createdAt,
                lastLogin: userData.meta?.lastLogin || null,
                totalAppointments: userData.meta?.totalAppointments || 0,
                totalSpent: userData.meta?.totalSpent || 0,
                status: userData.meta?.status || 'active'
            };
        });

        res.status(200).json({ users: transformedUsers });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/api/admin/users/:id", authenticate, async (req, res) => {
    try {
        const authUser = getAuthUser();
        if (authUser.role !== 'ADMIN') {
            return res.status(403).json({ message: "Access denied" });
        }

        const user = await User.findByPk(req.params.id, {
            attributes: ['id', 'email', 'displayName', 'role', 'attributes', 'meta', 'createdAt', 'updatedAt']
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const userData = user.toJSON();
        const transformedUser = {
            id: userData.id,
            name: userData.displayName,
            email: userData.email,
            role: userData.role === 'ADMIN' ? 'admin' : 'customer',
            phone: userData.attributes?.phone || '',
            avatar: userData.attributes?.avatar || '',
            joinDate: userData.createdAt,
            lastLogin: userData.meta?.lastLogin || null,
            totalAppointments: userData.meta?.totalAppointments || 0,
            totalSpent: userData.meta?.totalSpent || 0,
            status: userData.meta?.status || 'active'
        };

        res.status(200).json({ user: transformedUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put("/api/admin/users/:id", authenticate, async (req, res) => {
    try {
        const authUser = getAuthUser();
        if (authUser.role !== 'ADMIN') {
            return res.status(403).json({ message: "Access denied" });
        }

        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const { name, email, role, phone, avatar, status } = req.body;

        // Update user data
        const updateData = {
            displayName: name || user.displayName,
            email: email || user.email,
            role: role === 'admin' ? 'ADMIN' : 'USER'
        };

        // Update attributes and meta
        const currentAttributes = user.attributes || {};
        const currentMeta = user.meta || {};

        if (phone !== undefined) currentAttributes.phone = phone;
        if (avatar !== undefined) currentAttributes.avatar = avatar;
        if (status !== undefined) currentMeta.status = status;

        updateData.attributes = currentAttributes;
        updateData.meta = currentMeta;

        await user.update(updateData);

        // Return transformed data
        const updatedUser = user.toJSON();
        const transformedUser = {
            id: updatedUser.id,
            name: updatedUser.displayName,
            email: updatedUser.email,
            role: updatedUser.role === 'ADMIN' ? 'admin' : 'customer',
            phone: updatedUser.attributes?.phone || '',
            avatar: updatedUser.attributes?.avatar || '',
            joinDate: updatedUser.createdAt,
            lastLogin: updatedUser.meta?.lastLogin || null,
            totalAppointments: updatedUser.meta?.totalAppointments || 0,
            totalSpent: updatedUser.meta?.totalSpent || 0,
            status: updatedUser.meta?.status || 'active'
        };

        res.status(200).json({ 
            message: "User updated successfully",
            user: transformedUser 
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete("/api/admin/users/:id", authenticate, async (req, res) => {
    try {
        const authUser = getAuthUser();
        if (authUser.role !== 'ADMIN') {
            return res.status(403).json({ message: "Access denied" });
        }

        // Prevent deleting the current admin user
        if (parseInt(req.params.id) === authUser.id) {
            return res.status(400).json({ message: "Cannot delete your own account" });
        }

        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await user.destroy();

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Admin Routes
router.get("/api/admin/dashboard", authenticate, async (req, res) => {
    try {
        const authUser = getAuthUser();
        if (authUser.role !== 'ADMIN') {
            return res.status(403).json({ message: "Access denied" });
        }

        const totalAppointments = await Appointment.count();
        const totalServices = await Service.count({ where: { isActive: true } });
        const totalUsers = await User.count();
        const activePromotions = await Promotion.count({ where: { isActive: true } });

        res.status(200).json({
            dashboard: {
                totalAppointments,
                totalServices,
                totalUsers,
                activePromotions
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
