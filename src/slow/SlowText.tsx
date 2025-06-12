import _ from 'lodash';
import Slow from './slow.mdx';
import AnimatedWord from '../quick/words/NoiseAnimatedWord';

const Paragraph = ({ children }: { children: string }) => {
  return (
    <p className="mb-4">
      {_.words(children).map((word) => (
        <AnimatedWord>{word}</AnimatedWord>
      ))}
    </p>
  );
};

const SlowText = () => {
  return (
    <div className="">
      <Slow components={{ p: Paragraph }} />
    </div>
  );
};

export default SlowText;
