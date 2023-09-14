export const UpdateRecipeByStatus = async (data:any ) => {
    try {
      const response = await fetch(`https://lmsmhn4kg8.execute-api.us-east-1.amazonaws.com/prod/product-development/updatestatus`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      return response;
    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    }
  };
  