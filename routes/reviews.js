const express = require('express')
const router = express.Router()
const Review = require('../models/review')

router.get('/all', async (req, res) => {
  try{
    const reviews = await Review.find()
    res.status(200).json(reviews)
  }catch(error){res.status(500).json({ error: 'Erreur lors de la récupération des reviews' })}
})

router.get('/one/:email', async (req, res) => {
  try {
    const review = await Review.findOne({ email: req.params.email });
    if(!review){return res.status(404).json({ message: 'Aucun commentaire trouvé pour cet email.' })}
    res.status(200).json(review)
  }catch(error){res.status(500).json({ error: 'Erreur lors de la récupération du commentaire.' })}
})

router.post('/add', async (req, res) => {
  try {
    const newReview = new Review(req.body)
    await newReview.save()
    res.status(201).json({ message: 'Review ajoutée avec succès' })
  }catch(error){res.status(500).json({ error: 'Erreur lors de l\'ajout de la review' })}
})

router.put('/update/:email', async (req, res) => {
  try {
    const emailToUpdate = req.params.email;
    const updatedReview = req.body;

    const existingReview = await Review.findOne({ email: emailToUpdate });

    if(!existingReview){return res.status(404).json({ error: 'Aucune review trouvée avec cet email' });}

    existingReview.pseudo = updatedReview.pseudo;
    existingReview.note = updatedReview.note;
    existingReview.comment = updatedReview.comment;

    await existingReview.save();

    res.status(200).json({ message: 'Review mise à jour avec succès' });
  }catch(error){res.status(500).json({ error: 'Erreur lors de la mise à jour de la review' });}
})


router.delete('/delete/:email', async (req, res) => {
  try{
    await Review.deleteOne({ email: req.params.email })
    res.status(200).json({ message: 'Review supprimée avec succès' })
  }catch(error){res.status(500).json({ error: 'Erreur lors de la suppression de la review' })}
})

module.exports = router
