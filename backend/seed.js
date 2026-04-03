const mongoose = require('mongoose');
require('dotenv').config();
const Faq = require('./models/Faq');
const Student = require('./models/Student');

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/nst_mvp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const seedData = async () => {
  try {
    await Faq.deleteMany({});
    await Student.deleteMany({});

    await Faq.create([
      { category: 'Academics', question: 'What is the curriculum like?', answer: 'It is highly practical and industry-focused. For the First year, The main focus is on HTML, CSS, and JavaScript(React), Basic Maths, and Python(DSA)' },
      { category: 'Hostel', question: 'What is the hostel life like?', answer: 'The hostel provides a comfortable and conducive environment for learning and socializing.' },
      { category: 'Placements', question: 'Are there guaranteed placements?', answer: 'We offer extensive placement support and a strong alumni network.' }
    ]);

    await Student.create([
      { name: 'Kushal Rathore', year: 3, techStack: ['MERN', 'AI/ML'], calendlyLink: 'https://calendly.com/sample', isActive: true },
      { name: 'Arshi Gupta', year: 2, techStack: ['Python', 'Django'], calendlyLink: 'https://calendly.com/sample2', isActive: true }
    ]);

    process.exit();
  } catch (error) {
    process.exit(1);
  }
};

seedData();