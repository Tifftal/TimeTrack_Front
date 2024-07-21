import { useEffect } from "react";
import { apiInstance } from "../../api/apiInstance";

export const Stats = () => {
  useEffect(() => {
    apiInstance.get(`/activity?page=0&size=5&sort=string`)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      })
  }, []);

  return (
    <div>stats</div>
  )
}