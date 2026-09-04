import { Request, Response, NextFunction } from 'express';
import { assistantService } from '../services/assistant.service';

export async function chatWithAssistant(req: Request, res: Response, next: NextFunction) {
  try {
    const { message, context } = req.body;

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      res.status(400).json({ success: false, error: 'Message cannot be empty.' });
      return;
    }

    if (message.length > 500) {
      res.status(400).json({ success: false, error: 'Message is too long (maximum 500 characters).' });
      return;
    }

    const response = await assistantService.processChat(message, context);
    res.json({ success: true, data: response });
  } catch (error) {
    next(error);
  }
}
