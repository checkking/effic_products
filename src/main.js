import { createApp, ref, onMounted, onUnmounted } from 'vue'
import './assets/styles/main.css'

const app = createApp({
  setup() {
    const mobileMenuOpen = ref(false)
    const activeSection = ref('home')
    let sectionObserver = null

    function toggleMobileMenu() {
      mobileMenuOpen.value = !mobileMenuOpen.value
    }

    function closeMobileMenu() {
      mobileMenuOpen.value = false
    }

    function scrollToSection(id) {
      const el = document.getElementById(id)
      if (el) {
        const navHeight = document.querySelector('.navbar')?.offsetHeight || 0
        const top = el.offsetTop - navHeight
        window.scrollTo({ top, behavior: 'smooth' })
      }
      closeMobileMenu()
    }

    onMounted(() => {
      const sections = ['home', 'products', 'features']
      sectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              activeSection.value = entry.target.id
            }
          })
        },
        { threshold: 0.3, rootMargin: '-80px 0px -50% 0px' }
      )
      sections.forEach((id) => {
        const el = document.getElementById(id)
        if (el) sectionObserver.observe(el)
      })
    })

    onUnmounted(() => {
      if (sectionObserver) sectionObserver.disconnect()
    })

    return {
      mobileMenuOpen,
      activeSection,
      toggleMobileMenu,
      closeMobileMenu,
      scrollToSection,
    }
  },
})

// Custom directive: scroll reveal animation
app.directive('reveal', {
  mounted(el) {
    el.classList.add('reveal-hidden')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add('reveal-visible')
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )
    observer.observe(el)
  },
})

app.mount('#app')
