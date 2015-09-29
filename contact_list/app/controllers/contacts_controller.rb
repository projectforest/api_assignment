class ContactsController < ApplicationController
  def new
    @contact = Contact.new

  end
  
  def create
    @contact = Contact.new(contact_params)
    if @contact.save
      render json: @contact.to_json
    else
      render json: @contact.errors, status: 422
    end
    #render :index
  end

 

  def index
    @contacts = Contact.all
    # byebug
    if params[:searchparams]
      @contacts = @contacts.where("first_name LIKE ? OR last_name LIKE ? OR email LIKE ?", "%#{params[:searchparams]}%", "%#{params[:searchparams]}%", "%#{params[:searchparams]}%")
    end
    render json: @contacts.to_json

  end

  # def search
  #   @contacts = Contact.all
  #   byebug
  #   if params[:first_name] || params[:last_name] || params[:email]
  #     @contacts = @contacts.where("first_name LIKE ? OR last_name LIKE ? OR email LIKE ?", "%#{params[:first_name]}%", "%#{params[:last_name]}%", "%#{params[:email]}%")
  #     render json: @contacts.to_json
  #   end
  # end
 

  protected
  def contact_params
    params.require(:contact).permit(:searchparams, :first_name, :last_name, :email)
    #require(:contact)
  end
end
