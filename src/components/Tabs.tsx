type TabsProps = {
  activeTab: string;
  handleTabClick: (tab: string) => void;
  tabs: string[];
};

export const Tabs = (props: TabsProps): JSX.Element => {
  return (
    <div>
      {props.tabs.map((tab) => {
        return (
          <div key={tab} onClick={() => props.handleTabClick(tab)}>
            {tab}
          </div>
        );
      })}
    </div>
  );
};
