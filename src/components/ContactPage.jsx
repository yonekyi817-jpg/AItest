export default function ContactPage({ comments, commentText, onCommentChange, onAddComment, currentUser, onDeleteComment }) {
  return (
    <div className="section-grid mt-10">
      <section className="panel-card">
        <div>
          <h2 className="text-2xl font-semibold">Contact Us</h2>
          <p className="mt-3 text-amber-700">Reach out for help or leave feedback below.</p>
        </div>

        <div className="contact-card mt-8">
          <div className="contact-row">
            <div>
              <p className="text-sm text-amber-700">Email</p>
              <p className="font-semibold">support@honeysmarket.com</p>
            </div>
            <div>
              <p className="text-sm text-amber-700">Phone</p>
              <p className="font-semibold">+1 (800) 123-4567</p>
            </div>
            <div>
              <p className="text-sm text-amber-700">Telegram</p>
              <a
                href="https://t.me/Mgwe_Drix"
                target="_blank"
                rel="noreferrer"
                className="contact-link"
              >
                @Mgwe_Drix
              </a>
            </div>
          </div>
        </div>

        <div className="comment-panel mt-8">
          <h3 className="text-xl font-semibold">Leave a comment</h3>
          <textarea
            value={commentText}
            onChange={(e) => onCommentChange(e.target.value)}
            className="input-field mt-4"
            rows="5"
            placeholder="Write your feedback or question here..."
          />
          <button onClick={onAddComment} className="button-primary mt-4 w-full max-w-[220px]">
            Submit Comment
          </button>
        </div>

        <div className="comment-list mt-8">
          <h3 className="text-xl font-semibold">Comments</h3>
          {comments.length ? (
            <div className="space-y-4 mt-4">
              {comments.map((comment) => (
                <article key={comment.id} className="comment-card">
                  <div className="comment-header">
                    <div>
                      <p className="font-semibold">{comment.user}</p>
                      <p className="text-sm text-amber-700">{new Date(comment.date).toLocaleString()}</p>
                    </div>
                    {(comment.userEmail ? currentUser.email === comment.userEmail : currentUser.name === comment.user) && (
                      <button
                        onClick={() => onDeleteComment(comment.id)}
                        className="button-danger px-3 py-2 text-sm"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                  <p className="mt-3 text-amber-950">{comment.text}</p>
                </article>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-amber-700">No comments yet. Be the first to share feedback.</p>
          )}
        </div>
      </section>
    </div>
  )
}
