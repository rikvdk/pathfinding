export default function Board() {
  return (
    <svg
      version="1.1" width="100%" height="100%"
    >
      <style jsx>{`
        svg {
          background-size: 32px 32px;
          background-image:
            linear-gradient(to right, black 1px, transparent 1px),
            linear-gradient(to bottom, black 1px, transparent 1px);
        }
      `}</style>
    </svg>
  );
}