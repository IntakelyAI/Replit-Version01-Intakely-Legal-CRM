import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertTaskSchema, insertCaseSchema, insertClientSchema, insertNotificationSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for dashboard data
  app.get('/api/stats', async (req, res) => {
    const stats = await storage.getStats();
    res.json(stats);
  });

  // Tasks management
  app.get('/api/tasks', async (req, res) => {
    const tasks = await storage.getTasks();
    res.json(tasks);
  });

  app.post('/api/tasks', async (req, res) => {
    try {
      const taskData = insertTaskSchema.parse(req.body);
      const task = await storage.createTask(taskData);
      res.status(201).json(task);
    } catch (error) {
      res.status(400).json({ message: 'Invalid task data' });
    }
  });

  app.get('/api/tasks/:id', async (req, res) => {
    const task = await storage.getTask(parseInt(req.params.id));
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  });

  // Cases management
  app.get('/api/cases', async (req, res) => {
    const cases = await storage.getCases();
    res.json(cases);
  });

  app.post('/api/cases', async (req, res) => {
    try {
      const caseData = insertCaseSchema.parse(req.body);
      const newCase = await storage.createCase(caseData);
      res.status(201).json(newCase);
    } catch (error) {
      res.status(400).json({ message: 'Invalid case data' });
    }
  });

  // Clients management
  app.get('/api/clients', async (req, res) => {
    const clients = await storage.getClients();
    res.json(clients);
  });

  app.post('/api/clients', async (req, res) => {
    try {
      const clientData = insertClientSchema.parse(req.body);
      const client = await storage.createClient(clientData);
      res.status(201).json(client);
    } catch (error) {
      res.status(400).json({ message: 'Invalid client data' });
    }
  });

  // Calls management
  app.get('/api/calls', async (req, res) => {
    const calls = await storage.getCalls();
    res.json(calls);
  });

  // Notifications
  app.get('/api/notifications', async (req, res) => {
    const notifications = await storage.getNotifications();
    res.json(notifications);
  });

  app.post('/api/notifications', async (req, res) => {
    try {
      const notificationData = insertNotificationSchema.parse(req.body);
      const notification = await storage.createNotification(notificationData);
      res.status(201).json(notification);
    } catch (error) {
      res.status(400).json({ message: 'Invalid notification data' });
    }
  });

  app.patch('/api/notifications/:id/read', async (req, res) => {
    const updated = await storage.markNotificationRead(parseInt(req.params.id));
    if (!updated) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    res.json(updated);
  });

  // User management
  app.get('/api/users', async (req, res) => {
    const users = await storage.getUsers();
    res.json(users);
  });

  app.get('/api/users/:id', async (req, res) => {
    const user = await storage.getUser(parseInt(req.params.id));
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  });

  // Authentication routes (simplified - would use passport in a real app)
  app.post('/api/auth/login', async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await storage.getUserByUsername(username);
      if (!user || user.password !== password) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      // In a real app, you would generate a JWT token here
      res.json({ id: user.id, username: user.username });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
