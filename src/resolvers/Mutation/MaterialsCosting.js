
const { getUserId } = require('../../utils')
const MaterialsCosting = {
    addMaterials: async (_, args, ctx, info)=> {
        const id = getUserId(ctx)
        const {
            materialName,
            materialDescription,
            units,
            costPerUnit,
            standardUnit
        } = args;

        const material = await ctx.db.mutation.createMaterialsCosting({
            data: {
                materialName,
                materialDescription,
                units,
                costPerUnit,
                standardUnit,
                createdBy: {
                    connect: { id }
                },
            }
        }, info);
        return material;

    },
    editMaterials: async (_, args, ctx, info) => {
                const userId = getUserId(ctx);
        const {
            id,
            materialName,
            materialDescription,
            units,
            costPerUnit,
            standardUnit
            
        } = args;

        const material = await ctx.db.mutation.updateMaterialsCosting({
            where: { id },
            data: {
                materialName,
                materialDescription,
                units,
                costPerUnit,
                standardUnit,
                createdBy: {
                    connect: { id:userId }
                },
            }
        });
        
        return material;
    },
    removeMaterials: async (_, { id }, ctx, info) => { 
        const materialExists = await ctx.db.exists.MaterialsCosting({
            id
        })
        if (!materialExists) {
            throw new Error(`Material does not exist`);
        }
        return ctx.db.mutation.deleteMaterialsCosting({ where: { id } })
        
    }
};

module.exports = { MaterialsCosting };