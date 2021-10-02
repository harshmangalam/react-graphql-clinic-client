import { useQuery, gql, useMutation, useLazyQuery } from "@apollo/client";

const FETCH_PATIENTS_DATA = gql`
  query fetchPatientsData {
    fetchPatients {
      address
      age
      cfId
      city
      createdAt
      dob
      email
      gender
      height
      id
      maritalStatus
      medicineId
      name
      occupation
      pincode
      reffred
      state
      telephone
      weight
    }
  }
`;

const REMOVE_PATIENT_DATA = gql`
  mutation removePatientData($id: Int!) {
    removePatientData(id: $id)
  }
`;
function Dashboard() {
  const { data, loading, error } = useQuery(FETCH_PATIENTS_DATA);

  const [removePatientData] = useMutation(REMOVE_PATIENT_DATA, {
    refetchQueries: ["fetchPatientsData"],
  });

  if (loading) return <p>Loading....</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div className="px-2 overflow-x-scroll">
    
      <table className="divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {tables.map((table) => (
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                key={table}
              >
                {table}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.fetchPatients.map((data) => (
            <tr key={data.id}>
              <td className="px-6 py-4 whitespace-nowrap"> {data.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{data.pincode}</td>
              <td className="px-6 py-4 whitespace-nowrap">{data.gender}</td>
              <td className="px-6 py-4 whitespace-nowrap">{data.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{data.address}</td>
              <td className="px-6 py-4 whitespace-nowrap">{data.city}</td>
              <td className="px-6 py-4 whitespace-nowrap">{data.telephone}</td>
              <td className="px-6 py-4 whitespace-nowrap">{data.height}</td>
              <td className="px-6 py-4 whitespace-nowrap">{data.occupation}</td>
              <td className="px-6 py-4 whitespace-nowrap">{data.dob}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {data.maritalStatus}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{data.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{data.age}</td>
              <td className="px-6 py-4 whitespace-nowrap">{data.weight}</td>
              <td className="px-6 py-4 whitespace-nowrap">{data.reffredBy}</td>
              <td className="px-6 py-4 whitespace-nowrap">{data.state}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  className="btn btn--danger"
                  onClick={() =>
                    removePatientData({
                      variables: {
                        id: data.id,
                      },
                    })
                  }
                >
                  delete
                </button>
              </td>
              {/* <td className="px-6 py-4 whitespace-nowrap">
                <Link to={`/edit/${data.id}`}>
                  <button className="btn btn--warning">edit</button>
                </Link>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const tables = [
  "ID",
  "Pincode",
  "Gender",
  "Email",
  "Address",
  "City",
  "Telephone",
  "Height",
  "Occupation",
  "DOB",
  "Marital Status",
  "Name",
  "Age",
  "Weight",
  "Reffred By",
  "State",
  "Delete",
  // "Edit",
];

export default Dashboard;
