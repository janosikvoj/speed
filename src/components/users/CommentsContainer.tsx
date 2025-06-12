import { AnimatePresence, motion } from 'motion/react';
import type { Comment } from './UserSystem';
import _ from 'lodash';
import { cn } from '../../lib/utils';

interface CommentsContainerProps {
  comments: Comment[];
  removeComment: (id: string) => void;
}

const CommentsContainer: React.FC<CommentsContainerProps> = ({
  comments,
  removeComment,
}) => {
  return (
    <AnimatePresence>
      {comments.map((comment) => (
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ y: 10, opacity: 0 }}
          className={cn(
            'absolute min-w-25 max-w-75 wrap-anywhere text-left origin-top-left pointer-events-auto',
            `bg-${comment.theme}-3`
          )}
          style={{ top: comment.y, left: comment.x }}
          key={comment.id}
        >
          <div
            className={cn(
              'w-full h-5 flex justify-end',
              `bg-${comment.theme}-2`
            )}
          >
            <div className="h-full aspect-square w-auto bg-carbon-4" />
          </div>
          <p className="whitespace-pre-line p-2.5 text-sm">
            {_.words(comment.content).map((word, i) => (
              <span key={i} className="bg-carbon-1 text-transparent">
                {word}
              </span>
            ))}
          </p>
          <button
            className="absolute inset-0 cursor-pointer"
            onClick={() => removeComment(comment.id)}
          ></button>
        </motion.div>
      ))}
    </AnimatePresence>
  );
};

export default CommentsContainer;
