import { Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'

export default function ImageCarousel({ images }) {
  return (
    <div className="carousel">
      <Swiper
        modules={[Autoplay, Pagination]}
        loop={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
      >
        {images.map((img, i) => (
          <SwiperSlide key={i}>
            <div className="carousel-slide">
              <img src={img.src} alt={img.label} className="carousel-img" />
              {img.label && <span className="carousel-label">{img.label}</span>}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}