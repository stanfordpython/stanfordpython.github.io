import styles from '../CourseInfo/CourseInfo.module.css';

interface PersonCardProps {
  name: string;
  subtitle: string;
  img: string;
  links: Array<{ title: string, url: string }>
}

const PersonCard = ({ name, subtitle, img, links }: PersonCardProps) => {
  return (
    <div className="flex flex-col justify-center items-center p-2">
      <img src={img} alt={name} className="w-32 rounded-full" />
      <h2 className="text-xl font-normal">{name}</h2>
      <h3 className="text-lg italic">{subtitle}</h3>
      {
        links.map((link, index) => (
          <a 
            href={link.url}
            key={`${name}-link-${index}`} 
            className={`${styles.link} text-lg`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.title}
          </a>
        ))
      }
    </div>
  )
}

export default PersonCard;
export type {PersonCardProps};