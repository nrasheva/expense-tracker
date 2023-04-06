import styles from './Tabs.module.scss';

type TabsProps = {
  activeTab: string;
  handleTabClick: (tab: string) => void;
  tabs: string[];
};

export const Tabs = (props: TabsProps): JSX.Element => {
  return (
    <div className={styles.tabs}>
      {props.tabs.map((tab) => {
        return (
          <div
            className={styles.tab}
            key={tab}
            onClick={() => props.handleTabClick(tab)}
            style={{ color: tab === props.activeTab ? '#5a64d7' : 'black' }}
          >
            {tab}
          </div>
        );
      })}
    </div>
  );
};
