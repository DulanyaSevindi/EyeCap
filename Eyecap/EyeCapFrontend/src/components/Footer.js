const Footer = () => {
  return (
    <footer className="text-center text-lg-start bg-light text-muted">
      <section className="">
        <div className="container text-center text-md-start mt-5 pt-4">
          <div className="row mt-3">
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <i className="fas fa-gem me-3"></i>EyeCap
              </h6>
              <p>
                "Unlock a clearer tomorrow with our visionary eye care app. Join
                us in a world of better vision and eye health!"
              </p>
            </div>
            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Menu</h6>
              <p>
                <a href="/" className="text-reset">
                  EyeDetection
                </a>
              </p>
              <p>
                <a href="/aboutus" className="text-reset">
                  EyeExercise
                </a>
              </p>
              <p>
                <a href="/contactus" className="text-reset">
                  EyeQuiz
                </a>
              </p>
              <p>
                <a href="/services" className="text-reset">
                  Doctor
                </a>
              </p>
            </div>
            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Location</h6>
              <p>EyeCap Main Branch,</p>
              <p>S102/Malwana Road,</p>
              <p>Kandy</p>
              <p>Sri Lanka.</p>
            </div>
            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contact Details</h6>
              <p>
                <i className="fas fa-home me-3"></i>info@EyeCapMain.com
              </p>
              <p>
                <i className="fas fa-envelope me-3"></i>
                info@EyeCap.com
              </p>
              <p>
                <i className="fas fa-phone me-3"></i> + 94 234 567 88
              </p>
              <p>
                <i className="fas fa-print me-3"></i> + 94 234 567 89
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="text-center p-4 footer-bottom">
        Copyright © 2022 - eyeCap - All Rights Reserved. Concept, Design &
        Development by KYDW
      </div>
    </footer>
  );
};

export default Footer;
