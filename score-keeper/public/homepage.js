

        // let tableBody = document.getElementById("table-body");
        // let form = document.getElementById("createGameForm");
        // let baseURL = "http://localhost:3001/api/v1/users";
        // let currentPlayerData =
        //   JSON.parse(localStorage.getItem("currentPlayerData")) || [];

        // form.addEventListener("submit", async (e) => {
        //   e.preventDefault();
        //   const user = {
        //     username1: form.player1.value,
        //     username2: form.player2.value,
        //     username3: form.player3.value,
        //     username4: form.player4.value,
        //   };
        //   try {
        //     let res = await fetch(baseURL, {
        //       method: "POST",
        //       headers: {
        //         "Content-Type": "application/json",
        //       },
        //       body: JSON.stringify(user),
        //     });
        //     let response = await res.json();
        //     console.log(response);

        //     currentPlayerData = [
        //       user.username1,
        //       user.username2,
        //       user.username3,
        //       user.username4,
        //     ];

        //     // Save the current player data to localStorage
        //     localStorage.setItem(
        //       "currentPlayerData",
        //       JSON.stringify(currentPlayerData)
        //     );

        //     updateTable();
        //     form.reset();
        //   } catch (error) {
        //     console.error("Error:", error);
        //   }
        // });

        // function updateTable() {
        //   // Clear existing data in the table body
        //   tableBody.innerHTML = "";

        //   // Create a new row with the current player data
        //   let newRow = document.createElement("tr");
        //   newRow.innerHTML = `
        //         <th>#</th>
        //         <th>${currentPlayerData[0]}</th>
        //         <th>${currentPlayerData[1]}</th>
        //         <th>${currentPlayerData[2]}</th>
        //         <th>${currentPlayerData[3]}</th>
        //     `;

        //   // Append the new row to the table body
        //   tableBody.appendChild(newRow);
        // }

        // // Call updateTable() on page load to display existing player data
        // updateTable();

               let tableBody = document.getElementById("table-body");
               let form = document.getElementById("createGameForm");
               let baseURL = "http://localhost:3001/api/v1/users";
               let currentPlayerData =
                 JSON.parse(localStorage.getItem("currentPlayerData")) || [];
               let round = 1; // Initialize the round number

               form.addEventListener("submit", async (e) => {
                 e.preventDefault();
                 const user = {
                   username1: form.player1.value,
                   username2: form.player2.value,
                   username3: form.player3.value,
                   username4: form.player4.value,
                 };
                 try {
                   let res = await fetch(baseURL, {
                     method: "POST",
                     headers: {
                       "Content-Type": "application/json",
                     },
                     body: JSON.stringify(user),
                   });
                   let response = await res.json();
                   console.log(response);

                   currentPlayerData = [
                     user.username1,
                     user.username2,
                     user.username3,
                     user.username4,
                   ];

                   // Save the current player data to localStorage
                   localStorage.setItem(
                     "currentPlayerData",
                     JSON.stringify(currentPlayerData)
                   );

                   updateTable();
                   form.reset();
                 } catch (error) {
                   console.error("Error:", error);
                 }
               });

               function updateTable() {
                 // Clear existing data in the table body
                 tableBody.innerHTML = "";

                 // Create a new row with the current player data and sum of scores
                 let newRow = document.createElement("tr");
                 newRow.innerHTML = `
                <th>${round}</th>
                <th>${currentPlayerData[0]}</th>
                <th>${currentPlayerData[1]}</th>
                <th>${currentPlayerData[2]}</th>
                <th>${currentPlayerData[3]}</th>
                <th>${calculateSumOfScores()}</th>
            `;

                 // Append the new row to the table body
                 tableBody.appendChild(newRow);
               }

               function calculateSumOfScores() {
                 // Calculate the sum of scores for the current round
                 let sum = 0;
                 for (let i = 0; i < currentPlayerData.length; i++) {
                   sum += parseInt(currentPlayerData[i]);
                 }
                 return sum;
               }

               function addRound() {
                 // Increase the round number
                 round++;

                 // Call updateTable() to display the new round with the updated scores
                 updateTable();
               }

               // Call updateTable() on page load to display existing player data
               updateTable();

               // Add event listeners to each input element to update the table when scores change
               form.player1.addEventListener("input", updateTable);
               form.player2.addEventListener("input", updateTable);
               form.player3.addEventListener("input", updateTable);
               form.player4.addEventListener("input", updateTable);

               // Add event listener to the "Add Round" button
               document
                 .getElementById("addRoundButton")
                 .addEventListener("click", addRound);