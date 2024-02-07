import "./StatsComponentHeader.css";

export const StatsComponentHeader = ({
  statsComponentHeaderLabel = "Stats",
  className,
  ...props
}) => {
  return (
    <div className={"stats-component-header " + className}>
      <div className="stats-component-header-title">
        <div className="stats-component-header-label">
          {statsComponentHeaderLabel}{" "}
        </div>
      </div>
    </div>
  );
};
