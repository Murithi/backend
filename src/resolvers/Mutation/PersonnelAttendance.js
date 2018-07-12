const PersonnelAttendance = {
    addPersonnelAttendance: async (_, args, ctx, info) => { 
        const { personnelId,
            inAttendance,
            dateOfAttendance,
            reportingTime,
            exitTime
        } = args;

        const attendanceRecord = await ctx.db.mutation.createPersonnelAttendance({
            data: {
                employee: {
                    connect:{id:personnelId}
                },
                inAttendance,
                dateOfAttendance,
                reportingTime,
                exitTime
            }
        })
        return attendanceRecord;

    }
}
module.exports = { PersonnelAttendance}