export default function AIAnalysisCard({ complaint }) {
  return (
    <div className="analysis-card">
      <div className="analysis-chip">{complaint.priority} Priority</div>
      <h4>AI Analysis Result</h4>
      <p>
        <strong>Department:</strong> {complaint.department}
      </p>
      <p>
        <strong>Summary:</strong> {complaint.summary}
      </p>
      <p>
        <strong>Auto Response:</strong> {complaint.autoResponse}
      </p>
      <p>
        <strong>AI Source:</strong> {complaint.aiSource}
      </p>
    </div>
  );
}
