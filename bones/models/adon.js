// slugify field
const slug = require('mollusc')
const uniquefy = require('../../lib/uniquefy')

module.exports = exports = function adon (schema, options) {
  schema.add({
    slug: {
      type: String,
      unique: [true, 'A record with this alternative name already exists.'],
      maxlength: [255, 'A 255 character or less unique slug for the item.']
    },
    seoKeywords: {
      type: String,
      maxlength: [255, 'A 255 character or less unique set of keywords for the item.']
    },
    engaged: {
      type: Boolean,
      default: false
    }
  })

  // name: {
  //   type: String,
  //   maxlength: [127, 'A 127 character or less name of the item.'],
  //   required: [true, 'The name is required.']
  // },
  // alternateName: {
  //   type: String,
  //   maxlength: [255, 'A 255 character or less alias for the item.'],
  //   required: [false, 'A description of the item which not required.']
  // },
  // disambiguatingDescription: {
  //   type: String,
  //   maxlength: [255, 'A 255 character or less alias for the item.'],
  //   required: [true, 'The disambiguating description is required.']
  // },

  schema.pre('save', function (next) {
    this.slug = slug(this.disambiguatingDescription)
    this.seoKeywords = uniquefy.uniquefy(this.slug)
    next()
  })

  if (options && options.index) {
    schema.path('slug').index(options.index)
  }

  schema.method('engage', function (callback) {
    return this.update({
      engaged: true
    }).exec(callback)
  })

  schema.method('disengage', function (callback) {
    return this.update({
      engaged: false
    }).exec(callback)
  })

  schema.static('findByDisambiguating', function (disambiguatingDescription, callback) {
    return this.findOne({
      slug: slug(disambiguatingDescription)
    })
      .exec(callback)
  })
}
