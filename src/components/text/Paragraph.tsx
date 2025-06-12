import Rotate from './Rotate';
import SimplexColor from './SimplexColor';

const Paragraph = ({ children }: { children: string }) => {
  return (
    <p className="mb-4">
      {children.split(' ').map((word, index) => {
        if (Math.random() > 0.5) {
          return (
            <SimplexColor key={index} seed="1">
              <Rotate>{word}</Rotate>
            </SimplexColor>
          );
        } else {
          return (
            <SimplexColor
              key={index}
              seed="2"
              colors={['silicon-3', 'silicon-2', 'silicon-1', 'carbon-1']}
            >
              {word}
            </SimplexColor>
          );
        }
      })}
    </p>
  );
};

export default Paragraph;
