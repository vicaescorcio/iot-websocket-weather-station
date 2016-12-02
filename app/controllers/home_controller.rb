class HomeController < ApplicationController



  def index
    
  
  end

  def settings
  end

  def choose_station

    params
    $station = params["station"]
    redirect_to :back
  end
    
  
  

  def refresh_part
 
    @@client.subscribe(@@topic)
    topic,message = @@client.get
    @message_count = topic +message 
    respond_to do |format| 
        format.js {render :action=>"refresh_part.js"} 
        
    end
  end
end
