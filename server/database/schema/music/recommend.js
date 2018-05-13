const mongoose = require('mongoose')
const { Schema } = mongoose
const { ObjectId } = Schema.Types

const recommendSchema = new Schema({
    name: String,
    slider: [
        {
            id: ObjectId,
            linkUrl: String,
            picUrl: String
        }
    ],
    recommendList: [
        {
            id: ObjectId,
            dissid: String,
            imgurl: String,
            dissname: String,
            creator: {
                name: String
            }
        }
    ],
    meta: {
        createdAt: {
            type: Date,
            default: Date.now()
        },
        updatedAt: {
            type: Date,
            default: Date.now()
        }
    }
})

recommendSchema.pre('save', function(next) {
    if (this.isNew) {
        this.meta.createdAt = this.meta.updatedAt = Date.now()
    } else {
        this.meta.updatedAt = Date.now()
    }

    next()
})

mongoose.model('Recommend', recommendSchema)