import mongoose from 'mongoose'

const chatRoom = mongoose.Schema({
    user: {
         type: mongoose.Schema.Types.ObjectId, ref: 'User' 
    }, // Reference to the User model
    seller: {
         type: mongoose.Schema.Types.ObjectId, ref: 'Seller'
    }, // Reference to the Doctor model
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ChatMessage' }],
})

const ChatRoom = mongoose.model('chatRoom',chatRoom);

export default ChatRoom ;