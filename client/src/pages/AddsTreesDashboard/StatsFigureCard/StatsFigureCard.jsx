import "./StatsFigureCard.css";

export const StatsFigureCard = ({
  statFigure = "7,280",
  statTitle = "Trees you planted",
  className,
  ...props
}) => {
  return (
    <div className={"stats-figure-card " + className}>
      <div className="data">
        <div className="stat-title">{statTitle} </div>
        <div className="stat-figure">{statFigure} </div>
      </div>
    </div>
  );
};
