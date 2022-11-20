const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// DONE - WORKING
router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products

  Category.findAll({
    order: [['category_name', 'ASC']],
    include: [
      {
        model: Product
      },
    ]
  })
    .then(dbProduct => res.json(dbProduct))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    }
    );
});

// DONE - WORKING
router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: Product
      },
    ]
  })
    .then(dbProduct => res.json(dbProduct))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    }
    );

});

// DONE - WORKING
router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
    .then((category) => {
      res.status(200).json(category);
    })
    // .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// DONE - WORKING
router.put('/:id', (req, res) => {
  // update a category by its `id` value

  // Beg

  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((updatedCategory) => res.json(updatedCategory))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    }
    )
})

// DONE - WORKING
router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id,
    }
  })
    .then((dbCategory) => {
      if (!dbCategory) {
        res.status(404).json({ message: "No category found with this id!" });
        return;
      }
      res.json(dbCategory);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  //

});



module.exports = router;
