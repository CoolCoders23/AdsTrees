import "./Progress.css";
import { ProgressStripe } from "../ProgressStripe/ProgressStripe.jsx";

export const Progress = ({
  hasStripe = true,
  size = "xs",
  colorScheme = "blue",
  className,
  ...props
}) => {
  const variantsClassName = "size-" + size + " color-scheme-" + colorScheme;

  return (
    <div className={"progress " + className + " " + variantsClassName}>
      {(size === "sm" || size === "md" || size === "lg") && (
        <>
          <div className="track"></div>
        </>
      )}
      <div className="inner">
        {hasStripe && (
          <>
            <ProgressStripe className="stripe-instance"></ProgressStripe>
          </>
        )}
      </div>
    </div>
  );
};
