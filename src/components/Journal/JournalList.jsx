import JournalEntry from './JournalEntry';

const JournalList = ({ entries }) => {
  return (
    <div className="space-y-4">
      {entries.map(entry => (
        <JournalEntry key={entry.id} entry={entry} />
      ))}
    </div>
  );
};

export default JournalList;