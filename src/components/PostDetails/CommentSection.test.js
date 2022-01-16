import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CommentForm from './CommentForm';

test('on initial render, the comment button must be disabled', async () => {
  let comment = '';
  const setComment = (text) => {
    comment += text;
  };

  render(<CommentForm comment={comment} setComment={setComment} />);

  //check if comment button is dsabled
  expect(
    await screen.findByRole('button', { name: /comment/i })
  ).toBeDisabled();

  //type something into comment textbox
  userEvent.type(await screen.findByRole('textbox'), 'very nice');

  //check if comment button is now enabled
  // const button = screen.getByTestId('comment-button');
  const button = screen.getByText(/comment post/i).parentElement;

  expect(button).toBeEnabled();

  // expect(await screen.findByRole('button', { name: /comment/i })).toBeEnabled();
});

test('is button enabled when text is in state', async () => {
  const text = 'hello';

  const setComment = (text) => {
    let comment = text;
  };

  render(<CommentForm comment={text} setComment={setComment} />);
  //check if comment button is now enabled
  expect(await screen.findByRole('button', { name: /comment/i })).toBeEnabled();
});
