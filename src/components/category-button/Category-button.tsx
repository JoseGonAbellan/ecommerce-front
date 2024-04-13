import styles from "./category-button.module.css";

interface CategoryButtonProps{
  title: string;
  iconUrl: string;
  color: string;
  onClick: () => void;
}

export const CategoryButton: React.FC<CategoryButtonProps> = ({title, iconUrl, color, onClick}) => {
  return (
    <div style={{backgroundColor: color}} onClick={onClick} className={styles.categoryButton}>
        <p className={styles.categoryTitle}>{title}</p>
        <img src={process.env.PUBLIC_URL + iconUrl} alt={`Categoría ${title}`} className={styles.imageIcon}/>
    </div>
  );
}