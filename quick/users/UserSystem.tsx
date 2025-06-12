import { useState, useRef, useCallback, useMemo } from 'react';
import { generateRandomString } from '../../lib/utils';
import CommentsContainer from './CommentsContainer';
import Cursor from './Cursor';

export interface Comment {
  id: string;
  content: string;
  timestamp: Date;
  x: number;
  y: number;
  theme: 'oxygen' | 'nitrogen';
}
const MAX_COMMENTS = 15;

const UserSystem = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const removeComment = useCallback((commentId: string) => {
    setComments((prev) => prev.filter((comment) => comment.id !== commentId));
  }, []);

  // Function to add new comment - passed to cursors
  const addComment = useCallback((cursorX: number, cursorY: number) => {
    const newComment: Comment = {
      id: `comment-${Date.now()}-${Math.random()}`,
      content:
        generateRandomString(25, 35) + '\n ' + generateRandomString(15, 25),
      timestamp: new Date(),
      x: cursorX,
      y: cursorY,
      theme: Math.random() > 0.5 ? 'nitrogen' : 'oxygen',
    };

    setComments((prev) => {
      const updatedComments = [...prev, newComment];

      // Remove oldest comments if we exceed the limit
      if (updatedComments.length > MAX_COMMENTS) {
        // Sort by timestamp and keep only the most recent MAX_COMMENTS
        return updatedComments
          .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
          .slice(0, MAX_COMMENTS);
      }

      return updatedComments;
    });
  }, []);

  const cursors = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => ({
        id: i,
        displayName: generateRandomString(5, 15),
        delay: i * 500,
        cycleDuration: 2000 + Math.random() * 2000,
      })),
    [] // Empty dependency array means this only runs once
  );

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 [contain:layout] pointer-events-none z-10"
    >
      {/* Comments Display */}
      <CommentsContainer comments={comments} removeComment={removeComment} />

      {/* Fake User Cursors */}
      {cursors.map((cursor) => (
        <Cursor
          key={cursor.id}
          constraints={containerRef}
          delay={cursor.delay}
          cycleDuration={cursor.cycleDuration}
          addComment={addComment}
          displayName={cursor.displayName} // Now stable!
        />
      ))}
    </div>
  );
};

export default UserSystem;
