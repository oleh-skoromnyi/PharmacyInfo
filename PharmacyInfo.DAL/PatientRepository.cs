using System.Collections.Generic;
using System.Data.SqlClient;
using PharmacyInfo.Core.Entities;
using PharmasyInfo.Core.Interfaces;

namespace PharmacyInfo.DataAccessLayer
{
    public class PatientRepository : IRepository<Patient>
    {
        private const string getStoredProcedureName = "GetPatients";
        private const string addStoredProcedureName = "CreatePatient";

        private string _connectionString;
        public PatientRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public void AddEntity(Patient entity)
        {
            var connection = new SqlConnection(_connectionString);
            var command = new SqlCommand(addStoredProcedureName, connection);

            command.CommandType = System.Data.CommandType.StoredProcedure;
            command.Parameters.AddWithValue("@FirstName", entity.FirstName);
            command.Parameters.AddWithValue("@LastName", entity.LastName);
            command.Parameters.AddWithValue("@PharmacyAssignDate", entity.PharmacyAssignDate);
            command.Parameters.AddWithValue("@PharmacyId", entity.PharmacyId);

            connection.Open();
            command.ExecuteNonQuery();
            connection.Close();
        }

        public List<Patient> FindAll()
        {
            var connection = new SqlConnection(_connectionString);
            var command = new SqlCommand(getStoredProcedureName, connection);

            var resultList = new List<Patient>();

            command.CommandType = System.Data.CommandType.StoredProcedure;
            connection.Open();
            var reader = command.ExecuteReader();

            foreach (var row in reader) 
            {
                var listItem = new Patient();
                for (int i = 0; i < reader.FieldCount; ++i)
                {
                    typeof(Patient).GetProperty(reader.GetName(i))?.SetValue(listItem, reader.GetValue(i));
                }
                resultList.Add((Patient)listItem);
            }

            connection.Close();
            return resultList;
        }
    }
}
