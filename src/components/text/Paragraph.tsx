import Word from './Word';

const Paragraph = ({ children }: { children: string }) => {
  return (
    <p className="mb-4">
      {children.split(' ').map((word, index) => (
        <Word key={index}>{word}</Word>
      ))}
    </p>
  );
};

export default Paragraph;
