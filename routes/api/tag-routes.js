const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    order: [['tag_name', 'ASC']],
    include: [
      {
        model: Product,
        through: ProductTag
      }
    ]

  })
  .then(dbProduct => res.json(dbProduct))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});




router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    order: [['tag_name', 'ASC']],
    where: {id: req.params.id},
    include: [
      {
        model: Product,
        through: ProductTag
      }
    ]

  })
  .then(dbProduct => res.json(dbProduct))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});


// NOT WORKING
router.post('/', (req, res) => {
  // create a new tag

  Tag.create(req.body)
    .then((tag) => {
      return Tag.bulkCreate(TagArr);
      // if no product tags, just respond
      res.status(200).json(tag);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    }
  );
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
