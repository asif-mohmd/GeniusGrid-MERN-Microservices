function AboutUsPage() {
    return (
      <div className="sm:flex items-center max-w-screen-xl">
        <div className="sm:w-1/2 p-10">
          <div className="image object-center text-center">
            <img src="https://i.imgur.com/WbQnbas.png" alt="About Us"></img>
          </div>
        </div>
        <div className="sm:w-1/2 p-5">
          <div className="text">
            <span className="text-gray-500 border-b-2 border-indigo-600 uppercase">About us</span>
            <h2 className="my-4 font-bold text-3xl sm:text-4xl">About <span className="text-indigo-600">Our Company</span></h2>
            <p className="text-gray-700">
              Welcome to Genius Grid, your ultimate destination for cutting-edge e-learning in 2024 and beyond.
  
              At Genius Grid, we believe in the transformative power of education and its ability to unlock human potential. Our mission is to provide high-quality, accessible, and engaging online learning experiences for individuals around the globe. Whether you're a student, a professional seeking to enhance your skills, or a lifelong learner, Genius Grid is here to support your educational journey.
  
              Our platform offers a diverse range of courses designed by industry experts and experienced educators, ensuring that you gain practical, real-world knowledge. From technology and business to creative arts and personal development, we cover a wide spectrum of subjects to cater to your unique learning needs.
  
              What sets Genius Grid apart?
  
              <ul className="list-disc list-inside">
                <li><strong>Innovative Learning Experience:</strong> Our interactive courses are designed with the latest educational technologies to make learning effective and enjoyable. With video lectures, quizzes, hands-on projects, and discussion forums, we provide a holistic learning experience.</li>
                <li><strong>Expert Instructors:</strong> Learn from the best in the field. Our instructors are not just teachers but practitioners with real-world experience who bring valuable insights to their courses.</li>
                <li><strong>Flexible Learning:</strong> Learn at your own pace, anytime and anywhere. Our courses are available on-demand, allowing you to fit education into your busy schedule.</li>
                <li><strong>Community and Support:</strong> Join a global community of learners. Collaborate, share knowledge, and grow together with peers from around the world. Our dedicated support team is always ready to assist you with any queries.</li>
              </ul>
  
              Genius Grid is committed to making quality education accessible to all. As we step into 2024, we are excited to continue innovating and expanding our offerings to meet the evolving needs of our learners.
  
              Join us at Genius Grid and take the next step in your educational journey. Together, let's unlock your genius.
            </p>
          </div>
        </div>
      </div>
    )
  }
  
  export default AboutUsPage
  