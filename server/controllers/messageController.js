import { Message } from "../models/messageSchema.js";
import ErrorHandler from "../middlewares/error.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";

export const sendMessage = catchAsyncErrors(async (req, res, next) => {
  const { senderName, subject, message, senderEmail } = req.body;
  if (!senderName || !subject || !message || !senderEmail) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }
  if (senderEmail === null) {
    // Check for null explicitly
    return next(new ErrorHandler("Email cannot be null!", 400));
  }
  const data = await Message.create({
    senderName,
    subject,
    message,
    senderEmail,
  });
  res.status(201).json({
    success: true,
    message: "Message Sent",
    data,
  });
});

export const deleteMessage = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const message = await Message.findById(id);
  if (!message) {
    return next(new ErrorHandler("Message Already Deleted!", 400));
  }
  await message.deleteOne();
  res.status(201).json({
    success: true,
    message: "Message Deleted",
  });
});

export const getAllMessages = catchAsyncErrors(async (req, res, next) => {
  const messages = await Message.find();
  res.status(201).json({
    success: true,
    messages,
  });
});
