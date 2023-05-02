import { useEffect, useState } from 'react';
import { RecordsService } from '../lib/services/RecordsService';
import { User } from '../lib/types';
import { UserService } from '../lib/services/UserService';

function UserRecordsPage() {
  const [user, setUser] = useState<User | undefined>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [records, setRecords] = useState<any[]>([]); // TODO: replace any[] with Record[]
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // change this value to adjust the number of records per page
  const [loading, setLoading] = useState(false);

  const userService = new UserService();
  const recordsService = new RecordsService();

  useEffect(() => {
    userService.getUser()
      .then(user => {
        setUser(user);
        loadRecords(currentPage);
      })
      .catch(() => {
        window.location.href = '/login';
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function loadRecords(page: number, pageSize = 10) {
    setLoading(true);
    recordsService.getRecords(page, pageSize)
      .then(res => {
        setRecords(res.results);
        setTotalRecords(res.count);
        setCurrentPage(page);
      })
      .catch(() => {
        window.alert('Failed to load records');
      })
      .finally(() => {
        setLoading(false);
      })
  }

  function handlePrevPage() {
    if (currentPage > 1) {
      loadRecords(currentPage - 1);
    }
  }

  function handleNextPage() {
    if (currentPage < Math.ceil(totalRecords / pageSize)) {
      loadRecords(currentPage + 1);
    }
  }

  function handlePageSizeChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const newPageSize = parseInt(event.target.value);
    setPageSize(newPageSize);
    // Wait for the state to update before loading the records
    loadRecords(1, newPageSize);
  }

  return (
    <>
      {user && (
        <div className="flex justify-center">
          <div className="mx-auto">
            <table className="table w-full min-h-8">
              <thead>
                <tr>
                  <th className="text-left">ID</th>
                  <th className="text-left">Amount</th>
                  <th className="text-left">User Balance</th>
                  <th className="text-left">Operation Response</th>
                  <th className="text-left">Date</th>
                  <th className="text-left">Operation</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} className="text-center">
                      <div className="spinner"></div>
                    </td>
                  </tr>
                ) : (
                  records.map(record => (
                    <tr key={record.id}>
                      <td>{record.id}</td>
                      <td>{record.amount}</td>
                      <td>{record.user_balance}</td>
                      <td>{record.operation_response}</td>
                      {/* Format date */}
                      <td>{new Date(record.date).toLocaleString('en-US')}</td>
                      <td>{record.operation}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            <div className="flex justify-between mt-4 bg-base-100 rounded-md p-3 items-center">
              <div>
                Showing {records.length} of {totalRecords} records
              </div>
              <div>
                <select className="select select-bordered select-sm" value={pageSize} onChange={handlePageSizeChange}>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                </select>
              </div>
              <div>
                <button className="btn" onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
                <span className="mx-2">{currentPage}</span>
                <button className="btn" onClick={handleNextPage} disabled={currentPage === Math.ceil(totalRecords / pageSize)}>Next</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default UserRecordsPage;
