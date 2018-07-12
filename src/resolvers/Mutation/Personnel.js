const Personnel = {
    addPersonnel: (_, args, ctx, info) => { 
        const {
            firstName, lastName, idNumber, nssfId,
            nhifId, phoneNumber, gender, addressNo,
            location, photoUrl, highestEducationLevel,
            certificatesUrl, curriculumVitaeUrl,
            roleId, dateOfEmployment,
            currentSalary
        } = args

        return ctx.db.mutation.createPersonnel(
            {
                data: {

                    firstName, lastName, idNumber, nssfId,
                    nhifId, phoneNumber, gender, addressNo,
                    location, photoUrl, highestEducationLevel,
                    certificatesUrl, curriculumVitaeUrl,dateOfEmployment,
                    currentSalary,
                    designation: {
                        connect: { id: roleId },
                    }, 
                }
            },
            info
        )
        
    },

    editPersonnel: (_, args, ctx, info) => { 
        const { id,
            firstName, lastName, idNumber, nssfId,
            nhifId, phoneNumber, gender, addressNo,
            location, photoUrl, highestEducationLevel,
            certificatesUrl, curriculumVitaeUrl,
            roleId, dateOfEmployment,
            currentSalary
        } = args

        return ctx.db.mutation.updatePersonnel({
            where: { id },
            
            data: {
                firstName, lastName, idNumber, nssfId,
                nhifId, phoneNumber, gender, addressNo,
                location, photoUrl, highestEducationLevel,
                certificatesUrl, curriculumVitaeUrl,
                dateOfEmployment, currentSalary,  designation:{
                    connect: { id: roleId },
                },
            }
        },
            info)
    },

    terminatePersonnel: async (_, args, ctx, info) => { 
        const { id, reasonsForTermination, dateOfTermination } = args
        let terminationstatus = true
        return ctx.db.mutation.updatePersonnel({
            data: { id, terminationStatus, dateOfTermination, reasonsForTermination }
            
        })
    },

    assignToProject: async (_, args, ctx, info) => { 
        const { id, projectAssignedId } = args
        
        const Assignment = await ctx.db.mutation.updatePersonnel({
            where: { id },
            data: {
                projectAssignedTo: {
                    connect: { id: projectAssignedId }
                    }
            }
        })
        return Assignment
    },

    removePersonnel: async (_, { id }, ctx, info) => {
        const personnelExists = await ctx.db.exists.Personnel({ id, })

        if (!personnelExists) throw new Error('Personnel not found')       

        return ctx.db.mutation.deletePersonnel({where: {id}})
    }
}

module.exports = { Personnel }
