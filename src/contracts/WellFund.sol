// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

contract WellFund {
    address public owner;       // deployer's address
    uint public projectTax;     // our margin
    uint public projectCount;   // total no of projects
    uint public balance;        // amount collected
    statsStruct public stats;   // stats about the store
    projectStruct[] projects;   // array that holds all the projects

    mapping(address => projectStruct[]) projectsOf;     // returns all the projects ever created by that particular user
    mapping(uint => backerStruct[]) backersOf;          // returns all the backers of that particular project
    mapping(uint => bool) public projectExist;          // to check weather project exists or not -- with the help of project ID 


    enum statusEnum {               // contains all the stages of a particular project
        OPEN,
        APPROVED,
        REVERTED,
        DELETED,
        PAIDOUT
    }

    struct statsStruct {            // struct for statistics of the platform
        uint totalProjects;
        uint totalBacking;
        uint totalDonations;
    }

    struct backerStruct {           // carries information of each backer
        address owner;
        uint contribution;
        uint timestamp;
        bool refunded;
    }

    struct projectStruct {          // carries information of each project
        uint id;
        address owner;
        string title;
        string description;
        string imageURL;
        uint cost;
        uint raised;
        uint timestamp;
        uint expiresAt;
        uint backers;
        statusEnum status;
    }

    modifier ownerOnly(){           // check that only the owner/deployer can access
        require(msg.sender == owner, "Only for the Owner: ");
        _;
    }

    event Action (
        uint256 id,
        string actionType,
        address indexed executor,
        uint256 timestamp
    );

    constructor(uint _projectTax) {
        owner = msg.sender;
        projectTax = _projectTax;
    }

    // function to create a project -- a new project
    function createProject(             // responsible to create project/campaign
        string memory title,
        string memory description,
        string memory imageURL,
        uint cost,
        uint expiresAt
    ) public returns (bool) {       // take all the above information and then supply all to this function
    
        // some validations are performed after receiving the information

        require(bytes(title).length > 0, "Title cannot be empty");                  // checking title is not empty
        require(bytes(description).length > 0, "Description cannot be empty");      // checking description cannot be empty
        require(bytes(imageURL).length > 0, "ImageURL cannot be empty");            // checking image URL cannot be empty
        require(cost > 0 ether, "Cost cannot be 0");                                // checking cost cannot be empty

        // defining attributes
        projectStruct memory project;       
        project.id = projectCount;
        project.owner = msg.sender;
        project.title = title;
        project.description = description;
        project.imageURL = imageURL;
        project.cost = cost;
        project.timestamp = block.timestamp;
        project.expiresAt = expiresAt;

        projects.push(project);                 // pushed the new project in the project array
        projectExist[projectCount] = true;
        projectsOf[msg.sender].push(project);       // reference of who created this project
        stats.totalProjects += 1;                   // maintaining stats

        emit Action(
            projectCount++, 
            "PROJECT CREATED", 
            msg.sender, 
            block.timestamp
        );
        return true;
    }


    // function to update a project -- an existing project
    function updateProject(         // we cannot update the cost - it's unfair
        uint id,
        string memory title,
        string memory description,
        string memory imageURL,
        uint expiresAt
    )public returns (bool) {
        // validations
        require(msg.sender == projects[id].owner, "Unauthorized Entity");       // checking only owner can edit
        require(bytes(title).length > 0, "Title cannot be empty");
        require(bytes(description).length > 0, "Description cannot be empty");
        require(bytes(imageURL).length > 0, "ImageURL cannot be empty");

        // updating information
        projects[id].title = title;
        projects[id].description = description;
        projects[id].imageURL = imageURL;
        projects[id].expiresAt = expiresAt;

        emit Action(
            id, 
            "PROJECT UPDATED", 
            msg.sender, 
            block.timestamp
        );
        return true;
    }


    // function to delete a project
    function deleteProject(uint id) public returns (bool) {
        require(projects[id].status == statusEnum.OPEN, "Project no longer opened");
        
        // require(
        //     msg.sender == projects[id].owner ||         // clause -- not only the owner of the project but the platform owner can also delete the project
        //     msg.sender == owner,
        //     "Unautharized Entity"
        // );
        
        require(msg.sender == projects[id].owner, "Unautharized Entity");   // only creater can delete the project

        projects[id].status = statusEnum.DELETED;
        performRefund(id);         // refund if the project has already got some backings

        emit Action(
            id, 
            "PROJECT DELETED", 
            msg.sender, 
            block.timestamp
        );
        return true;
    }


    // function to perform refunds
    function performRefund(uint id) internal {                      // take the id of the particular project
        for(uint i=0; i<backersOf[id].length; i++) {                    // go to each user
            address _owner = backersOf[id][i].owner;                    // get the address of the owner/contributor
            uint _contribution = backersOf[id][i].contribution;         // get the contribution of user

            backersOf[id][i].refunded = true;                           // mark that user as refunded
            backersOf[id][i].timestamp = block.timestamp;               // mark the timestamp of refund
            payTo(_owner, _contribution);                               // refund money

            stats.totalBacking -= 1;                                    // updating stats
            stats.totalDonations -= _contribution;
        }
    }

    // function to send money to a specific address
    function payTo(address to, uint256 amount) internal {
        (bool success, ) = payable(to).call{value: amount}("");
        require(success);
    }

}