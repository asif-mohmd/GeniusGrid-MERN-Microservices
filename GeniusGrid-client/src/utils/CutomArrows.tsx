/* eslint-disable @typescript-eslint/no-explicit-any */
// SampleNextArrow.js

export function SampleNextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0, 0, 0, 0.5)",
        borderRadius: "50%",
        width: "40px",
        height: "40px",
        right: "-25px",
        zIndex: 1,
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="white"
        width="24px"
        height="24px"
      >
        <path d="M12 2l-1.41 1.41L18.17 11H2v2h16.17l-7.58 7.59L12 22l10-10z" />
      </svg>
    </div>
  );
}


// SamplePrevArrow.js
export function SamplePrevArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0, 0, 0, 0.5)",
        borderRadius: "50%",
        width: "40px",
        height: "40px",
        left: "-25px",
        zIndex: 1,
        cursor: "pointer"
      }}
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="white"
        width="24px"
        height="24px"
      >
        <path d="M12 22l1.41-1.41L5.83 13H22v-2H5.83l7.58-7.59L12 2 2 12z"/>
      </svg>
    </div>
  );
}
