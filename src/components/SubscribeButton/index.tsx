import  styles from './styles.module.scss';
export function SubscribreButton(){
  return (
    <button 
      type="button" 
      className={styles.subscribeButton}
      >
        Subscribe now
      </button>
  )
}