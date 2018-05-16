sap.ui.controller("smax.batch31.A2.controller.ProductDetail", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf view.ProductDetail
*/
	onInit: function() {

		/*var oController = this;
		var oComponent = oController.getOwnerComponent();
		var oRouter = oComponent.getRouter();*/
		
		var oRouter = this.getOwnerComponent().getRouter();
	//	debugger;
		oRouter.getRoute("detail").attachPatternMatched(this._handleEvent, this);
		
	},
	
	_handleEvent : function(oEvent){
		
		var pId = oEvent.getParameters().arguments.productID;
		var dd  = oEvent.getParameters().arguments.name;
		  //      debugger;
		this.getView().bindElement("/ProductSet('"+pId+"')");
	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf view.ProductDetail
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf view.ProductDetail
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf view.ProductDetail
*/
//	onExit: function() {
//
//	}
	onCreate : function(){
		var oDialog = new sap.m.Dialog({
			title : "Create Product",
			content : [
				new sap.m.Label({ text : "Product ID"}),
				new sap.m.Input(),
				new sap.m.Label({ text : "Name"}),
				new sap.m.Input(),
				new sap.m.Label({ text : "Category"}),
				new sap.m.Input()
			],
			buttons : [
				new sap.m.Button({ text : "Save and Close", press : function(){
					debugger;
					var data = {
							ProductID : oDialog.getContent()[1].getValue(),
							Name : oDialog.getContent()[3].getValue(),
							Category : oDialog.getContent()[5].getValue()
					}
			        var oModel = oDialog.getModel();
					
					oModel.create("/ProductSet", data, {
						success : function(){
							sap.m.MessageToast.show("Data Created");
						},
						error : function(){
							sap.m.MessageToast.show("Data Not Created");
						}
					});
					
					oDialog.close();
				}})
			]
		});
		var oModel = this.getOwnerComponent().getModel();
		oDialog.setModel(oModel);
		oDialog.open();
	},
	onUpdate : function(){
		
		var oController = this;
		debugger;
		var oDialog = new sap.m.Dialog({
			title : "Update Product",
			content : [
				new sap.m.Label({ text : "Product ID"}),
				new sap.m.Input({value : oController.getView().byId("idprod").getText(), editable : false}),
				new sap.m.Label({ text : "Name"}),
				new sap.m.Input({value : oController.getView().byId("idName").getText()})
				
			],
			buttons : [
				new sap.m.Button({ text : "Save and Close", press : function(){
					debugger;
					var data = {
							Name : oDialog.getContent()[3].getValue()
					}
			        var oModel = oDialog.getModel();
					
					oModel.update("/ProductSet('"+oController.getView().byId("idprod").getText()+"')", data, {
						success : function(){
							sap.m.MessageToast.show("Data Updated");
						},
						error : function(){
							sap.m.MessageToast.show("Data Not Updated");
						}
					});
					
					oDialog.close();
				}})
			]
		});
		var oModel = this.getOwnerComponent().getModel();
		oDialog.setModel(oModel);
		oDialog.open();
		
	}

});


