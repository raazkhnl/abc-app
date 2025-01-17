import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import TestimonialCard from "./TestimonialCard";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";

const Testimonial = () => {
  // Dummy data for testimonials
  const testimonials = [
    {
      name: "John Doe",
      subtitle: "Software Engineer",
      review:
        "This service has completely transformed my career prospects. Highly recommend!",
      rating: 4,
    },
    {
      name: "Jane Smith",
      subtitle: "Marketing Manager",
      review:
        "An excellent experience from start to finish. The team is very supportive.",
      rating: 3.5,
    },
    {
      name: "Sam Wilson",
      subtitle: "Graphic Designer",
      review:
        "Great service with amazing support. I found the perfect program for me.",
      rating: 4.5,
    },
    {
      name: "Anna Johnson",
      subtitle: "Data Scientist",
      review:
        "I couldn't be happier with my decision to use this service. Highly professional!",
      rating: 5,
    },
    {
      name: "Michael Brown",
      subtitle: "Project Manager",
      review:
        "The best service for studying abroad. The process was smooth and efficient.",
      rating: 2,
    },
    {
      name: "Emily Davis",
      subtitle: "UX/UI Designer",
      review:
        "Fantastic experience! I received excellent guidance and support throughout.",
      rating: 3,
    },
  ];

  return (
    <>
      <div className="w-[80%] flex flex-col justify-center mx-auto">
        <div className="relative flex flex-col items-center w-full">
          <h1 className="font-bold text-3xl mb-7">Testimonials</h1>
          <div className="absolute bottom-3 h-1 w-[80%] md:w-[25%] bg-yellow-300"></div>
        </div>
        <div className="w-full mx-auto">
          <Splide
            aria-label="Client Testimonials"
            options={{
              rewind: true,
              gap: "-2rem",
              arrows: true,
              pagination: false,
              perPage: 4,
              autoplay: true, // Enable auto scroll
              interval: 2000, // Set the interval between slides in milliseconds (optional)
              pauseOnHover: true,
              breakpoints: {
                640: {
                  perPage: 1,
                  gap: "0.5rem",
                },
                1024: {
                  perPage: 2,
                  gap: "1rem",
                },
              },
            }}
          >
            {testimonials.map((testimonial, index) => (
              <SplideSlide key={index}>
                <TestimonialCard
                  name={testimonial.name}
                  subtitle={testimonial.subtitle}
                  review={testimonial.review}
                  rating={testimonial.rating}
                />
              </SplideSlide>
            ))}
          </Splide>
        </div>
      </div>
    </>
  );
};

export default Testimonial;
