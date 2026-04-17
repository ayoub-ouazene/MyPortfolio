import { useEffect, useState } from 'react'

const links = ['about','skills','projects','hackathons','education','contact']

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive]     = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)

    const sections = document.querySelectorAll('section[id]')
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id) })
    }, { threshold: 0.4 })
    sections.forEach((s) => io.observe(s))

    return () => { window.removeEventListener('scroll', onScroll); io.disconnect() }
  }, [])

  return (
    <nav className={scrolled ? 'scrolled' : ''}>
      <div className="nav-logo">Ayoub<span>.</span></div>
      <ul className="nav-links">
        {links.map((id) => (
          <li key={id}>
            <a href={`#${id}`} className={active === id ? 'active' : ''}>
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
